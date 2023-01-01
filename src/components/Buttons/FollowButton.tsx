import React, { useState, useEffect } from 'react';
import { UserType } from '../../global/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { follow, unfollow } from '../../utils/ProfileActions/FollowProfile';
import { Button } from '@mantine/core';

function FollowButton({ user }: { user: UserType }) {
  const { currentUserProfile } = useAuth();
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();

  const checkUserIsNull = (user: UserType) => {
    if (user === null || user === undefined) {
      return true;
    }
  };

  useEffect(() => {
    if (currentUserProfile.follows.includes(user.id)) {
      setIsFriend(true);
    }
    if (!checkUserIsNull(user) && !checkUserIsNull(currentUserProfile)) {
      if (!checkUserIsNull(user)) {
        if (currentUserProfile.follows?.includes(user.id)) {
          setIsFriend(true);
        }
      }
    }
  }, [user || isFriend]);

  const handleFollow = () => {
    if (checkUserIsNull(currentUserProfile)) {
      navigate('/login');
    } else {
      follow(user, currentUserProfile);
      setIsFriend(true);
    }
  };

  const handleUnfollow = () => {
    unfollow(user, currentUserProfile);
    setIsFriend(false);
  };

  return (
    <>
      {!isFriend ? (
        <Button variant="filled" className="me-4" onClick={handleFollow}>
          Follow
        </Button>
      ) : (
        <Button variant="filled" color="gray" className="me-4" onClick={handleUnfollow}>
          Unfollow
        </Button>
      )}
    </>
  );
}

export default FollowButton;
