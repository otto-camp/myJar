import { updateDoc, doc } from 'firebase/firestore/lite';
import React from 'react';
import { db } from '../../services/firebase.js';
import { UserType } from '../../global/types';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { URL_REGEX } from '../../global/Constants';

interface ISocialModal {
  id: string;
  user: UserType;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSocialModal = ({ user, opened, setOpened, id }: ISocialModal) => {
  const socialForm = useForm({
    initialValues: {
      website: user.website ?? '',
      github: user.github ?? '',
      twitter: user.twitter ?? '',
      facebook: user.facebook ?? '',
      instagram: user.instagram ?? ''
    },
    validate: {
      website: (val) => val === null ?? (URL_REGEX.test(val) ? null : 'Invalid Website URL'),
      github: (val) => val === null ?? (URL_REGEX.test(val) ? null : 'Invalid GitHub URL'),
      twitter: (val) => val === null ?? (URL_REGEX.test(val) ? null : 'Invalid Twitter URL'),
      facebook: (val) => val === null ?? (URL_REGEX.test(val) ? null : 'Invalid Facebook URL'),
      instagram: (val) => val === null ?? (URL_REGEX.test(val) ? null : 'Invalid Instagram URL')
    }
  });

  const updateSocials = (value: any) => {
    updateDoc(doc(db, 'profile', id), {
      website: value.website,
      github: value.github,
      twitter: value.twitter,
      facebook: value.facebook,
      instagram: value.instagram
    });
    window.location.reload();
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} size="md" centered>
      <form onSubmit={socialForm.onSubmit((val) => updateSocials(val))}>
        <TextInput
          label="Website link"
          value={socialForm.values.website}
          {...socialForm.getInputProps('website')}
          mb="0.5rem"
        />
        <TextInput
          label="GitHub link"
          value={socialForm.values.github}
          {...socialForm.getInputProps('github')}
          mb="0.5rem"
        />
        <TextInput
          label="Twitter link"
          value={socialForm.values.twitter}
          {...socialForm.getInputProps('twitter')}
          mb="0.5rem"
        />
        <TextInput
          label="Facebook link"
          value={socialForm.values.facebook}
          {...socialForm.getInputProps('facebook')}
          mb="0.5rem"
        />
        <TextInput
          label="Instagram link"
          value={socialForm.values.instagram}
          {...socialForm.getInputProps('instagram')}
          mb="0.5rem"
        />
        <Button fullWidth size="md" type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateSocialModal;
