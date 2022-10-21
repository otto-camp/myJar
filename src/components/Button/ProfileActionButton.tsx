import React, { useState, Suspense, useEffect } from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../global/types';
import { useAuth } from '../../services/AuthContext';
import { follow, unfollow } from '../../utils/ProfileActions/FollowProfile';

interface IProfileActions {
  user: UserType | undefined;
}

const ProfileActionButton: React.FC<IProfileActions> = ({ user }) => {
  const { currentUserProfile } = useAuth();
  const [isFollow, setIsFollow] = useState(false);

  const navigate = useNavigate();

  const checkUserIsNull = (user: UserType) => {
    if (user === null || user === undefined) {
      return true;
    }
  };

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    if (props.user !== undefined) {
      if (currentUserProfile.follows?.includes(props.user.id)) {
        setIsFollow(true);
=======
    if (!checkUserIsNull(user!) && !checkUserIsNull(currentUserProfile)) {
=======
    if (!checkUserIsNull(user!)) {
>>>>>>> parent of 9f18ee1 (Add google analytics)
      if (currentUserProfile.follows?.includes(user?.id)) {
        setIsFriend(true);
>>>>>>> 9f18ee1e9dd1dc929592b927d8b91c7efbe5f00d
      }
    }
  }, [user]);

  const handleFollow = () => {
    if (checkUserIsNull(currentUserProfile)) {
      navigate('/login');
    } else {
<<<<<<< HEAD
      follow(props.user, currentUserProfile);
      setIsFollow(true);
=======
      follow(user, currentUserProfile);
>>>>>>> 9f18ee1e9dd1dc929592b927d8b91c7efbe5f00d
    }
  };

  const handleUnfollow = () => {
<<<<<<< HEAD
    unfollow(props.user, currentUserProfile);
    setIsFollow(true);
=======
    unfollow(user, currentUserProfile);
>>>>>>> 9f18ee1e9dd1dc929592b927d8b91c7efbe5f00d
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Row>
<<<<<<< HEAD
<<<<<<< HEAD
        <ButtonGroup aria-label="Profile actions">
          {!isFollow ? (
=======
        <ButtonGroup aria-label="Profile actions">
          {!isFriend ? (
>>>>>>> parent of 9f18ee1 (Add google analytics)
            <Button className="rounded-pill me-4 w-50" onClick={handleFollow}>
              Follow
            </Button>
          ) : (
            <Button className="rounded-pill me-4 w-50" onClick={handleUnfollow}>
              Unfollow
            </Button>
          )}
          <Button className="rounded-pill ms-4 w-50">Message</Button>
        </ButtonGroup>
<<<<<<< HEAD
=======
        {currentUserProfile && (
          <ButtonGroup aria-label="Profile actions">
            {!isFriend ? (
              <Button className="rounded-pill me-4 w-50" onClick={handleFollow}>
                Follow
              </Button>
            ) : (
              <Button className="rounded-pill me-4 w-50" onClick={handleUnfollow}>
                Unfollow
              </Button>
            )}
            <Button className="rounded-pill ms-4 w-50">Message</Button>
          </ButtonGroup>
        )}
>>>>>>> 9f18ee1e9dd1dc929592b927d8b91c7efbe5f00d
=======
>>>>>>> parent of 9f18ee1 (Add google analytics)
      </Row>
    </Suspense>
  );
};

export default ProfileActionButton;
