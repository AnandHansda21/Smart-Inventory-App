import { useState } from 'react';
import { Button } from './ui/button';
import { Icons } from './ui/enhanced-icons';
import { InputModal } from './InputModal';
import { VoiceInputModal } from './VoiceInputModal';
import { useApp } from './context/AppContext';

export function BottomNavigation() {
  const { state, dispatch } = useApp();
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const handleVoiceTranscript = (transcript: string) => {
    // Simple parsing for voice input
    // Expected format: "item name $price quantity number"
    const words = transcript.toLowerCase().split(' ');
    const priceIndex = words.findIndex(word => word.includes('$') || word.includes('dollar'));
    const quantityIndex = words.findIndex(word => word.includes('quantity') || word.includes('qty'));

    let name = '';
    let price = '';
    let quantity = '';

    if (priceIndex > 0) {
      name = words.slice(0, priceIndex).join(' ');
      const priceWord = words[priceIndex].replace('$', '').replace('dollar', '');
      price = priceWord;
    }

    if (quantityIndex > 0 && quantityIndex < words.length - 1) {
      quantity = words[quantityIndex + 1];
    }

    // If parsing failed, just put the whole transcript as the name
    if (!name && !price && !quantity) {
      name = transcript;
    }

    // Add the item with parsed data
    if (name.trim()) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          name: name.trim(),
          price: price ? parseFloat(price) : 0,
          quantity: quantity ? parseInt(quantity) : 1,
          notes: `Added via voice: "${transcript}"`,
          status: 'active',
        },
      });
    }
  };

  const toggleMainCompleted = () => {
    if (state.currentScreen === 'main') {
      dispatch({ type: 'SET_SCREEN', payload: 'completed' });
    } else {
      dispatch({ type: 'SET_SCREEN', payload: 'main' });
    }
  };

  return (
    <>
      <div className="bg-card border-t border-border px-4 sm:px-6 py-3 shadow-lg w-full">
        <div className="flex items-center justify-between max-w-none">
          {/* Voice Input */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex-col gap-1 h-auto py-2 touch-target flex-1 max-w-[80px]"
          >
            <Icons.microphone size="lg" strokeWidth={1.5} />
            <span className="text-caption font-medium">Voice</span>
          </Button>

          {/* Main/Completed Toggle Button */}
          <Button
            variant={state.currentScreen === 'completed' ? 'default' : 'ghost'}
            onClick={toggleMainCompleted}
            className={`px-4 sm:px-6 flex-1 max-w-[140px] touch-target font-semibold text-subhead transition-colors ${
              state.currentScreen === 'completed' 
                ? 'text-primary-foreground' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            {state.currentScreen === 'completed' ? 'Main' : 'Completed'}
          </Button>

          {/* Keyboard Input */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsInputModalOpen(true)}
            className="flex-col gap-1 h-auto py-2 touch-target flex-1 max-w-[80px]"
          >
            <Icons.add size="lg" strokeWidth={2} />
            <span className="text-caption font-medium">Add</span>
          </Button>
        </div>
      </div>

      <InputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
      />

      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onTranscriptComplete={handleVoiceTranscript}
      />
    </>
  );
}