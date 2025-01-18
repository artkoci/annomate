import { Button } from "@/components/ui/button";
import { useImages } from "@/context/ImageContext";
import mascot from "@/assets/mascot.png";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export const Download = () => {
  const { images } = useImages();

  useEffect(() => {
    // Fire initial confetti burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ["#22c55e", "#16a34a", "#15803d"]; // Different shades of green

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // After initial burst, add some random pops
    const randomConfetti = setInterval(() => {
      confetti({
        particleCount: 10,
        angle: 90,
        spread: 100,
        origin: { y: 0.8, x: Math.random() },
        colors: colors,
        startVelocity: 20,
      });
    }, 1500);

    return () => clearInterval(randomConfetti);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
        <img 
          src={mascot} 
          alt="Annomate Mascot" 
          className="w-32 h-32 mx-auto mb-6 animate-bounce" 
        />
        <h1 className="text-4xl font-bold mb-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          Annotation Complete!
        </h1>
        <p className="text-gray-400 mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          Your annotations have been saved successfully.
        </p>
        <div className="flex flex-col gap-4 items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <Button 
            variant="default"
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 min-w-64 font-semibold"
            onClick={() => {
              // TODO: Implement download functionality
              console.log("Download annotations");
              // Add a small confetti burst on download click
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.7 }
              });
            }}
          >
            Download Annotations
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="min-w-64 border-violet-400 border-2 text-violet-400 hover:bg-violet-500 hover:text-white font-semibold"
            onClick={() => {
              // Start a new session by clearing the images
              window.location.href = "/";
            }}
          >
            Start New Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Download; 