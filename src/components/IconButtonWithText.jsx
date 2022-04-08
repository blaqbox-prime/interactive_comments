import React from 'react'
import { Button, Image, Text } from '@chakra-ui/react';

function IconButtonWithText({buttonType, value, children, onClick}) {

    const setTextColor = () => {
        switch (buttonType) {
            case "delete": return 'soft_red';
            default: return 'moderate_blue';
        }
    }

    const setIcon = () => {
        switch (buttonType) {
            case "delete": return 'images/icon-delete.svg';
            case "reply": return 'images/icon-reply.svg';
            case "edit": return 'images/icon-edit.svg';
            default: return 'moderate_blue';
        }
    }


  return (
    <Button color={setTextColor()} bg={'transparent'}
    value={value}
    onClick={ onClick }
    _hover={{
        opacity:.6
    }}
    >
      <Image src={setIcon()}
        marginRight={2}
        pointerEvents='none'
      />
      <Text fontWeight={'black'} pointerEvents='none'>{children}</Text>
    </Button>
  )
}

export default IconButtonWithText