import Script from 'next/script';
import TableIndex from "@/components/Table.Index";

// Define the confetti logic as a string to be evaluated after the CDN loads.
const blastEffectScript = `
  const duration = 15 * 350,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    const particleCount = 50 * (timeLeft / duration);
  
    // Left side blast
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#4285F4", "#0F9D58", "#F4B400", "#DB4437"], // Google Colors
        emojis: ["🔥", "🔥", "🔥", "🔥", "🔥", "🎖️", "🎖️", "🎖️"], // Fire Emojis and Medal Emojis
      })
    );
    
    // Right side blast
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#4285F4", "#0F9D58", "#F4B400", "#DB4437"], // Google Colors
        emojis: ["🔥", "🔥", "🔥", "🔥", "🔥", "🎖️", "🎖️", "🎖️"], // Fire Emojis and Medal Emojis
      })
    );
  }, 250);
`;

export default function Home() {
    return (
        <>
          {/* Confetti Script: Loads the library, then executes the blast effect when ready */}
          <Script 
              src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js" 
              strategy="beforeInteractive"
              onLoad={() => {
                  // Use setTimeout to ensure the global 'confetti' function is fully available
                  setTimeout(() => {
                    eval(blastEffectScript);
                  }, 500);
              }}
          />
          
          <nav className='w-full shadow-md relative'>
            <div className="bg-gray-900 text-blue-500 w-full m-auto text-center p-2 flex justify-center items-center">
              <p className=''>
                Google Cloud Study Jams 25 - 26
              </p>
            </div>
    
            <div className="p-3 flex mob:flex-col m-auto max-w-6xl justify-between items-center">
              
              {/* The 'logo' div now contains only the text and the links div */}
              <div className="logo mob:border-b mob:border-b-gray-200 flex justify-center items-center">
                
                  {/* This is the text section of the navigation header */}
                  <div className="text flex flex-col justify-start items-start">
                    <p className="text-base">Google Developer Group On Campus</p>
                    <p className="text-xs">Vivekananda College of Arts, Science and Commerce(Autonomous), Puttur</p>
                  </div>

                {/* The 'links' div should be inside the 'p-3 flex' container, not necessarily the 'logo' div
                   if you want them separated horizontally, but following your original structure: */}
              </div> {/* Closes the 'logo' div which now holds the text */}

              <div className="links mob:py-3 flex justify-center items-center space-x-5">
                {/* Add your navigation links here */}
              </div>
              
            </div> {/* Closes the 'p-3 flex' div */}
          </nav>
    
          <TableIndex />
    
        </>
      )
}
