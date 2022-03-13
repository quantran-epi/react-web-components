import React from "react";
import { Button } from './Button';

export default {
    title: "Button",
};

export const Default = () => <Button
    margin={5}
    padding={10}
    marginBottom={[10, 50, 100]}
    marginTop={[20, 30, 40]}
    paddingBottom={[10, 30, 50]}
    paddingTop={[60, 70, 80]}
    _hover={{
        padding: [100, 200]
    }}
    className="test-button"
    style={{
        color: 'red'
    }}>Button</Button>
