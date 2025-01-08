import PageContainer from "../../components/PageContainer"

const Error404 = () => {
  return (
    <PageContainer>
      <div className="flex items-center justify-center w-screen h-[400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
          <a href="/" className="bg-white text-black p-2 rounded-lg">
            Go Home
          </a>
        </div>
      </div>

    </PageContainer>
  )
}

export default Error404