import { useState, useEffect } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (transcript: string) => void;
}

export function VoiceInputModal({ isOpen, onClose, onTranscriptComplete }: VoiceInputModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleUseTranscript = () => {
    if (transcript.trim()) {
      onTranscriptComplete(transcript.trim());
      onClose();
    }
  };

  const handleClose = () => {
    stopListening();
    setTranscript('');
    onClose();
  };

  if (!isOpen) return null;

  const isSupported = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 md:items-center md:justify-center">
      <div className="bg-card w-full max-w-md rounded-t-2xl md:rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Voice Input</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {!isSupported ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Speech recognition is not supported in your browser.
            </p>
            <Button onClick={handleClose}>Close</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "default"}
                onClick={isListening ? stopListening : startListening}
                className="w-20 h-20 rounded-full"
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                {isListening 
                  ? 'Listening... Tap to stop' 
                  : 'Tap to start speaking'
                }
              </p>
            </div>

            {transcript && (
              <Card className="p-4">
                <h3 className="font-medium mb-2">Transcript:</h3>
                <p className="text-sm text-muted-foreground mb-4">"{transcript}"</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setTranscript('')}
                  >
                    Clear
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleUseTranscript}
                  >
                    Use This Text
                  </Button>
                </div>
              </Card>
            )}

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Speak clearly and include item name, price, and quantity.
                <br />
                Example: "Apples $3.50 quantity 5"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}