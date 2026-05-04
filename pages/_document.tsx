import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Vyshnavi Nandyala — Senior Data Engineer. Building scalable data pipelines that power insights. Snowflake, dbt, AWS, Python specialist." />
        <meta name="keywords" content="Data Engineer, Snowflake, dbt, AWS, Python, SQL, Airflow, Pipeline, ETL, Data Lakehouse" />
        <meta name="author" content="Vyshnavi Nandyala" />
        <meta property="og:title" content="Vyshnavi Nandyala — Senior Data Engineer" />
        <meta property="og:description" content="Building scalable data pipelines that power insights. 8+ years in production data systems." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vyshnavi Nandyala — Senior Data Engineer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
