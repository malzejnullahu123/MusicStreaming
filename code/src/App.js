import { Artist, Albums, Charts, Profile, Home, Layout, Login, Search, AlbumDetails, SongDetails } from "./router"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ArtistDetails } from "./pages/ArtistDetails";
import SearchBar from "./components/search/SearchBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
            <Layout>
              <Home />
            </Layout> }
        />
        <Route path='/albums' element={
            <Layout>
              <Albums />
            </Layout> }
        />
        <Route path='/charts' element={
            <Layout>
              <Charts />
            </Layout> }
        />
        <Route path='/artists' element={
            <Layout>
              <Artist />
            </Layout> }
        />
         <Route path='/login' element={
            <Layout>
              <Login />
            </Layout> }
        />

          <Route path='/albumDetails/:albumId' element={
          <Layout>
            <AlbumDetails />
            </Layout>} 
        />

          <Route path='/songDetails/:songId' element={
          <Layout>
            <SongDetails />
            </Layout>} 
        />

         <Route path='/search/:query' component={Search}  element={
            <Layout>
              <Search />
            </Layout> }
        />
          <Route path="/artist/:artistId" component={ArtistDetails} element={
            <Layout>
              <ArtistDetails />
            </Layout> }
        />
         <Route path='/profile' element={
            <Layout>
              <Profile />
            </Layout> }
           />
      </Routes>
    </Router>
  )
}

export default App
