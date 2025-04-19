import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Dog } from "src/types/types";
import Confetti from 'react-confetti';
import { useEffect, useState, useRef } from "react";

interface DogMatchDialogProps {
    isOpen: boolean;
    onClose: () => void;
    matchedDog?: Dog;
}

const DogMatchDialog = ({ isOpen, onClose, matchedDog }: DogMatchDialogProps) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            // Play bark sound
            if (audioRef.current) {
                audioRef.current.currentTime = 0; // Reset audio to start
                audioRef.current.play().catch(error => {
                    console.warn('Audio playback failed:', error);
                });
            }
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!matchedDog) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src="/sounds/bark.mp3"
                preload="auto"
            />
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-md">
                    {showConfetti && (
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            numberOfPieces={1000}
                            initialVelocityY={10}
                            initialVelocityX={10}
                            tweenDuration={3000}
                            recycle={false}
                        />
                    )}
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-center mb-4">
                            You matched with {matchedDog.name}! 🎉
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-full h-64 rounded-lg overflow-hidden">
                            <img
                                src={matchedDog.img}
                                alt={matchedDog.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/300x300?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">{matchedDog.name}</h3>
                                <span className="text-gray-500">#{matchedDog.zip_code}</span>
                            </div>
                            <p className="text-gray-600">{matchedDog.breed}</p>
                            <p className="text-gray-600">{matchedDog.age} years old</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DogMatchDialog; 