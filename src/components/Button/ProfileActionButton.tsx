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
  const [isFriend, setIsFriend] = useState(false);

  const navigate = useNavigate();

  const checkUserIsNull = (user: UserType) => {
    if (user === null || user === undefined) {
      return true;
    }
  };

  useEffect(() => {
    if (!checkUserIsNull(user!) && !checkUserIsNull(currentUserProfile)) {
      if (currentUserProfile.follows?.includes(user?.id)) {
        setIsFriend(true);
      }
    }
  }, [user]);

  const handleFollow = () => {
    if (checkUserIsNull(currentUserProfile)) {
      navigate('/login');
    } else {
      follow(user, currentUserProfile);
    }
  };

  const handleUnfollow = () => {
    unfollow(user, currentUserProfile);
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Row>
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
      </Row>
    </Suspense>
  );
};

export default ProfileActionButton;
