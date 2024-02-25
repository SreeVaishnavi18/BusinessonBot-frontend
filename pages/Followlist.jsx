import "./followlist.css";
import CloseFriend from "../../components/closeFriend/CloseFriend";

function FollowList({ followers, following }) {
  return (
    <div className="followList">
      <div className="followListWrapper">
        <h3 className="followListTitle">Followers</h3>
        <ul className="followListList">
          {followers && followers.map((follower) => (
            <CloseFriend key={follower.id} user={follower} />
          ))}
        </ul>
      </div>
      <div className="followListWrapper">
        <h3 className="followListTitle">Following</h3>
        <ul className="followListList">
          {following && following.map((followed) => (
            <CloseFriend key={followed.id} user={followed} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FollowList;
