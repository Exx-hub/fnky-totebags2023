import styles from "./ProfileMenu.module.css";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

interface ProfileMenuProps {
  toggleSubNav: () => void;
}

function ProfileMenu({ toggleSubNav }: ProfileMenuProps) {
  return (
    <div className={styles.profileMenuContainer} onClick={toggleSubNav}>
      <FaUserCircle />
      <FaCaretDown />
    </div>
  );
}

export default ProfileMenu;

// if logged in initials, if not profile badge
