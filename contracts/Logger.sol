// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Logger {

    event Log(string message);

    string public message;

    function log(string memory _message) public {
        message = _message;
        emit Log(_message);
    }

}