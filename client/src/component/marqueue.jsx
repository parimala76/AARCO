import React from "react"; // Import the React library

// Define the Marquee component
const Marquee = () => {
  return (
    <div className="bg-yellow-300 py-2">
      {/* Container div with a background color and padding */}
      <div className="overflow-hidden whitespace-nowrap">
        {/* Apply overflow hidden to ensure the content doesn't break out of the container, 
            and whitespace-nowrap ensures that the text stays on a single line */}
        <p className="inline-block animate-scroll text-black font-semibold text-lg">
          {/* The scrolling text content, styled as bold, black, and slightly larger */}
          Important Announcement: Event on 25th September | New Updates Released | Welcome New Members to AARCO
        </p>
      </div>
    </div>
  );
};

export default Marquee; // Export the Marquee component so it can be used in other parts of the application
