import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { Film, Home, User, BarChart3, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is on the landing page
    if (location.pathname === "/") {
      // Only apply scroll effect on landing page
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // On other pages, always show solid header
      setIsScrolled(true);
    }
  }, [location.pathname]);

  // Mock login status based on route
  useEffect(() => {
    setIsLoggedIn(!["/", "/auth"].includes(location.pathname));
  }, [location.pathname]);

  const handleGoogleAuth = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/auth?client_id=751047087683-kd88h5t67glb9c12b2g12svtr9a3a4co.apps.googleusercontent.com&redirect_uri=http://localhost:8080&response_type=token&scope=email%20profile",
      "_self"
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled
          ? "bg-[hsl(var(--header-background))] border-b border-gray-800/40 text-[hsl(var(--header-foreground))]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80 text-[hsl(var(--header-foreground))]"
        >
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isLoggedIn ? (
            <>
              <NavLink to="/emotions" icon={<Home className="h-4 w-4" />}>
                Home
              </NavLink>
              <NavLink to="/dashboard" icon={<BarChart3 className="h-4 w-4" />}>
                History
              </NavLink>
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-[hsl(var(--header-foreground))]"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </Link>
            </>
          ) : (
            <Link to={location.pathname === "/" ? "/auth" : "/"}>
              <Button
                variant="ghost"
                size="sm"
                className="text-[hsl(var(--header-foreground))]"
              >
                {location.pathname === "/" ? "Get Started" : "Back"}
              </Button>
            </Link>
          )}

          {/* <ThemeToggle /> */}
        </nav>

        {/* <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-[hsl(var(--header-foreground))]">
            <User className="h-5 w-5" />
          </Button>
        </div> */}
      </div>
    </header>
  );
};

const NavLink = ({
  to,
  children,
  icon,
}: {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 font-medium transition-colors hover:text-primary ${
        isActive
          ? "text-primary"
          : "text-[hsl(var(--header-foreground))] text-opacity-80"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Header;
