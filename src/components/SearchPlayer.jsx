import { useEffect, useState } from 'react';
import '../css/SearchPlayer.css';
import { addFavoritePlayer } from '../services/firestore';
import { useLoginContext } from '../contexts/LoginContext';

function SearchPlayer(prop) {
  const { favoritePlayers, addPlayer } = useLoginContext();

  const handleFollowClick = (e) => {
    e.stopPropagation();
    addPlayer(prop);
    console.log('click');
  };

  const isFollowing = favoritePlayers.some((p) => p.id === prop.id);

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

        <p className="player-name">{prop.firstName}</p>
        <p className="player-name">{prop.lastName}</p>
        <div className="follow-box" onClick={handleFollowClick}>
          {isFollowing ? (
            <p className="follow-text">Following</p>
          ) : (
            <p className="follow-text">Follow</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPlayer;
