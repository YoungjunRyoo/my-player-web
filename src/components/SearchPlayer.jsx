import { useEffect, useState } from 'react';
import '../css/SearchPlayer.css';
import { useLoginContext } from '../contexts/LoginContext';

function SearchPlayer(prop) {
  const { favoritePlayers, addPlayerInFavorites, deletePlayerInFavorites } =
    useLoginContext();

  const handleFollowClick = (e) => {
    e.stopPropagation();
    addPlayerInFavorites(prop);
  };

  const handleFollowingClick = (e) => {
    e.stopPropagation();
    deletePlayerInFavorites(prop.id);
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

        <p className="p-name">{prop.firstName}</p>
        <p className="p-name">{prop.lastName}</p>
        {isFollowing ? (
          <div className="following-box" onClick={handleFollowingClick}>
            <p className="following-text">Following</p>
          </div>
        ) : (
          <div className="follow-box" onClick={handleFollowClick}>
            <p className="follow-text">Follow</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPlayer;
