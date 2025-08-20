import '../css/SearchPlayer.css';
import { addFavoritePlayer } from '../services/firestore';

function SearchPlayer(prop) {
  const handleFollowClick = (e) => {
    e.stopPropagation();
    addFavoritePlayer(prop);
    console.log('click');
  };
  return (
    <>
      <div className="playerInfo">
        <div className="playerInfo-img">
          <img
            className="img"
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${prop.id}/headshot/67/current.png`}
            onError={(e) => {
              e.target.onerror = null; // 무한 루프 방지
              e.target.src = '../../public/images/logo.png'; // 대체 이미지 경로
            }}
          />
        </div>

        <p className="p-name">{prop.firstName}</p>
        <p className="p-name">{prop.lastName}</p>
        <div className="follow-box" onClick={handleFollowClick}>
          <p className="follow-text">Follow</p>
        </div>
      </div>
    </>
  );
}

export default SearchPlayer;
