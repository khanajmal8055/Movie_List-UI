import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import Movie from './components/Movie'

const BASE_API_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_API_KEY
// console.log(API_KEY);


const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm , setSearchTerm] = useState('')

  const [errorMessage , setErrorMessage] = useState('')

  const [movieList , setMovieList] = useState([])

  const [isLoading , setIsLoading] = useState(false)

  const [trendingMoviesList , setTrendingMoviesList] = useState([])

  const fetchMovies = async(query = '')=>{
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query  ? `${BASE_API_URL}/search/movie?query=${encodeURIComponent(query)}`  :`${BASE_API_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()

      console.log(data);
      

      if(data.Response === false){
        setErrorMessage(data.error || 'Failed to Fetch Movies')
        setMovieList([])
        return;
      }

      setMovieList(data.results)
      
    } catch (error) {
      console.log(`Error while fetching movies data :${error}`);
      setErrorMessage('Error Fetching Movies, Please try again later..')
      
    }
    finally{
      setIsLoading(false)
    }
  }

  const trendingMovies = async()=> {
    try {
      const endPoint= `${BASE_API_URL}/trending/movie/week`
      
      const response = await fetch(endPoint , API_OPTIONS)

      if(!response.ok){
        throw new Error("Failed to fetch trending Movies")
      }

      const data = await response.json()

      console.log(data);

      setTrendingMoviesList(data.results)

    } 
    catch (error) {
      console.log(`Error in Fetching Top Trending Movies : ${error}`);
      
    }
  }

  useEffect(()=>{
    fetchMovies(searchTerm)
  },[searchTerm])

  useEffect(() => {
    trendingMovies()
  }, [])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="hero-banner.png" alt="Hero-Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You 'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMoviesList.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMoviesList.map((movie , index) => (
                <li key={movie.id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? 
          (<Spinner/>) : 
          errorMessage ? 
          (<p className='text-red-500'>{errorMessage}</p>) : 
          <ul>
            {movieList.map((movie)=>(
              <Movie movie={movie}/>
              
            ))}
          </ul>
          }
        </section>
        
      </div>
    </main>
  )
}

export default App
