import { useEffect } from "react"
import Home from "./Pages/Home"
import { useModalStore } from "./stores/ModalStore"
import { useProtectedProfile } from "./hooks/useProtectedProfile"
import { useInitializeTheme } from "./hooks/useInitializeTheme"

function App() {

  const { token, refreshProfile } = useProtectedProfile()
  const { isOpen } = useModalStore()
  useInitializeTheme(token, refreshProfile)

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "colorScheme") {
        console.log("Detected colorScheme change in another tab:", e.newValue);
        window.confirm()
      }
    };

    window.addEventListener("storage", handler);

    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <>
      <main
        className='min-h-screen bg-primary'
      >
        <Home />
        <div
          className={`fixed top-0 right-0 left-0 bottom-0 bg-black opacity-0 -z-1 ease-in-out duration-500 ${isOpen ? 'opacity-60 z-40' : ''}`}
        ></div>
      </main>
    </>
  )
}

export default App
