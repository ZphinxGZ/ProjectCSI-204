import { Menus } from "./utils";
import Logo from "./assets/logohome.png";
import DesktopMenu from "./components/DesktopMenu";
import MobMenu from "./components/MobMenu";
import { useNavigate } from "react-router-dom";

export default function App({ children }) { // Accept children as a prop
  const navigate = useNavigate();

  return (
    <div>
      <header className="h-16 text-[15px] fixed top-0 left-0 right-0 flex-center bg-[#18181A] z-50">
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
          <button
            className="flex-center gap-x-3 z-[999] relative"
            onClick={() => navigate("/")} // Navigate to the root when clicked
          >
            <img src={Logo} alt="" className="size-8" />
            <h3 className="text-lg font-semibold">Home</h3>
          </button>

          <ul className="gap-x-1 lg:flex-center hidden">
            {Menus.map((menu) => (  
              <DesktopMenu
                menu={menu}
                key={menu.name}
                onClick={(link) => {
                  if (link) navigate(link); // Navigate to the link if provided
                }}
              />
            ))}
          </ul>
          <div className="flex-center gap-x-5">
            {/* <button
              aria-label="sign-in"
              className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center"
              onClick={() => console.log("Clicked: Sign In")} // Log the button name
            >
              Sign In
            </button> */}
            <div className="lg:hidden">
              <MobMenu
                Menus={Menus}
                navigate={navigate} // Pass navigate directly to MobMenu
                onClick={(menu) => {
                  console.log(`Clicked: ${menu.name}`); // Log the button name
                  if (menu.onClick) menu.onClick(navigate); // Trigger navigation
                }}
              />
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-16"> {/* Add padding to prevent content overlap */}
        {children} {/* Render routed pages here */}
      </main>
    </div>
  );
}
