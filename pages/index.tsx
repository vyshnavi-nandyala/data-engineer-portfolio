import Head from 'next/head'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Vyshnavi Nandyala — Senior Data Engineer</title>
        <meta name="description" content="Senior Data Engineer specializing in Snowflake, dbt, AWS, Python, and Apache Airflow. Building scalable data pipelines that power insights." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-[#020817] min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
