export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Textile Trade Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The premier B2B marketplace connecting textile manufacturers with buyers worldwide. 
            Discover quality fabrics, get instant quotes, and build lasting business relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary px-8 py-3 text-lg">
              Browse Products
            </button>
            <button className="btn-secondary px-8 py-3 text-lg">
              Join as Manufacturer
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Find exactly what you need with our powerful filtering system. 
                Search by material, color, price, and more.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Suppliers</h3>
              <p className="text-gray-600">
                All manufacturers are thoroughly verified with proper documentation 
                and compliance certificates.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Quotes</h3>
              <p className="text-gray-600">
                Request and receive detailed quotations quickly. 
                Compare prices and terms from multiple suppliers.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              🚧 This is a development version of the Textile Trade Portal
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Backend API Health: <span className="text-primary-600 font-medium">Checking...</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
