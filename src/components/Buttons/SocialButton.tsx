import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ISocialButton {
  url: string;
  icon: IconDefinition;
  label: string;
}

function SocialButton({ url, icon, label }: ISocialButton) {
  return (
    <>
      {url ? (
        <Button variant="none" className="w-100">
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <FontAwesomeIcon icon={icon} className="fa-xl float-start text-black" />
            <span className="text-black">{url}</span>
          </a>
        </Button>
      ) : (
        <Button variant="none" className="w-100" disabled aria-label={label}>
          <FontAwesomeIcon icon={icon} className="fa-xl float-start" />
          <span className="text-black">Not Available</span>
        </Button>
      )}
    </>
  );
}

export default SocialButton;
