// components/ui/Menu.tsx
import { FC, useEffect, useRef, useState } from "react";

interface MenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Menu: FC<MenuProps> = ({ anchorEl, open, onClose, children }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Position menu based on anchorEl
  useEffect(() => {
    if (anchorEl && open) {
      const rect = anchorEl.getBoundingClientRect();
      const menu = menuRef.current;
  
      if (menu) {
        const { offsetHeight, offsetWidth } = menu;
  
        let top = rect.bottom + window.scrollY;
        let left = rect.left + window.scrollX;
  
        if (left + offsetWidth > window.innerWidth) {
          left = window.innerWidth - offsetWidth - 8;
        }
  
        if (top + offsetHeight > window.innerHeight + window.scrollY) {
          top = rect.top + window.scrollY - offsetHeight;
        }
  
        setPosition({ top, left });
      }
    }
  }, [anchorEl, open]);
  
  

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-50 min-w-[150px] rounded-md shadow-lg bg-background border border-muted p-2"
      style={{ top: position.top, left: position.left }}
    >
      {children}
    </div>
  );
};

export default Menu;
