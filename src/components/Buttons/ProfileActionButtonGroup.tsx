import React from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { UserType } from '../../global/types';
import FollowButton from './FollowButton';

interface IProfileActionButtonGroup {
  user: UserType;
}

const ProfileActionButtonGroup: React.FC<IProfileActionButtonGroup> = ({ user }) => {
  return (
    <Row>
      <ButtonGroup aria-label="Profile actions">
        <FollowButton user={user} />
        <Button className="rounded-pill ms-4 w-50">Message</Button>
      </ButtonGroup>
    </Row>
  );
};

export default ProfileActionButtonGroup;
