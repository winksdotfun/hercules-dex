import { useState, useEffect } from "react";

const useResponsiveModalSize = () => {
  const [modalSize, setModalSize] = useState("compact");

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is smaller than 640px (Tailwind's sm breakpoint)
      if (window.innerWidth < 450) {
        setModalSize("auto"); // Use 'auto' or smaller size for smaller screens
      } else {
        setModalSize("compact");
      }
    };

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Call handler immediately to set the right size
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return modalSize;
};

export default useResponsiveModalSize;