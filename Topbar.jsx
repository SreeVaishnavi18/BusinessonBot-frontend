import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useContext ,useState} from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {

  const {user}=useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/users/search?query=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }finally {
      setLoading(false);
    }
  
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="logo">SOCIALOPEDIA</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchTerm}
            onChange={handleSearchInputChange}
            

          />
          <button className="searchButton" onClick={handleSearch}>
            Search
          </button>
          {loading && <div className="loader">Loading...</div>}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="searchResults">
            {searchResults.map((result) => (
              <Link
                to={`/profile/${result.username}`}
                style={{ textDecoration: "none" }}
                key={result._id}
              >
                <div className="searchResultItem">
                  <img
                    src={
                      result.profilePicture
                        ? PF + result.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="searchResultImg"
                  />
                  <span className="searchResultName">{result.username}</span>
                </div>
              </Link>
              ))}
          </div>
        <Link to={`/profile/${user.username}`}>
        <img 
          src={user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
          } alt="" className="topbarImg"/>
          </Link>
      </div>
    </div>
  );
}