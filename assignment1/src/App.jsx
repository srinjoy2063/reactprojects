import Header from "./components/Header"
import Navigation from "./components/Navigation"
import About from "./components/About"
import Education from "./components/Education"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <About />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App