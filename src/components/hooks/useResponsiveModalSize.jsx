import { useState, useEffect } from "react";

const useResponsiveModalSize = () => {
  const [modalSize, setModalSize] = useState("compact");

  useEffect(() => {
    const handleResize = () => {
      // Set modal size to 'auto' if width is less than 450px, otherwise 'compact'
      if (window.innerWidth < 450) {
        setModalSize("auto");
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
