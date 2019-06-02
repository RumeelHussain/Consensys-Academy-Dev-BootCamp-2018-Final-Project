pragma solidity ^0.4.24;

library EmailRegex {
  struct State {
    bool accepts;
    function (byte) internal pure returns (uint) func;
  }

  function state(uint id) internal pure returns (State) {
    if (id == 1) {
      return State(false, s1);
    }
    if (id == 2) {
      return State(false, s2);
    }
    if (id == 3) {
      return State(false, s3);
    }
    if (id == 4) {
      return State(false, s4);
    }
    if (id == 5) {
      return State(false, s5);
    }
    if (id == 6) {
      return State(false, s6);
    }
    if (id == 7) {
      return State(false, s7);
    }
    if (id == 8) {
      return State(false, s8);
    }
    if (id == 9) {
      return State(true, s9);
    }
    if (id == 10) {
      return State(true, s10);
    }
  }

  function matches(string input) public pure returns (bool) {
    uint cur = 1;

    for (uint i = 0; i < bytes(input).length; i++) {
      bytes1 c = bytes(input)[i];

      cur = state(cur).func(c);
      if (cur == 0) {
        return false;
      }
    }

    return state(cur).accepts;
  }

  function s1(byte c) internal pure returns (uint) {
    if (c >= 37 && c <= 37 || c >= 43 && c <= 43 || c >= 45 && c <= 45 || c >= 46 && c <= 46 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 95 && c <= 95 || c >= 97 && c <= 122) {
      return 2;
    }

    return 0;
  }

  function s2(byte c)  internal pure  returns (uint) {
    if (c >= 37 && c <= 37 || c >= 43 && c <= 43 || c >= 45 && c <= 45 || c >= 46 && c <= 46 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 95 && c <= 95 || c >= 97 && c <= 122) {
      return 3;
    }
    if (c >= 64 && c <= 64) {
      return 4;
    }

    return 0;
  }

  function s3(byte c)  internal pure returns (uint) {
    if (c >= 37 && c <= 37 || c >= 43 && c <= 43 || c >= 45 && c <= 45 || c >= 46 && c <= 46 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 95 && c <= 95 || c >= 97 && c <= 122) {
      return 3;
    }
    if (c >= 64 && c <= 64) {
      return 4;
    }

    return 0;
  }

  function s4(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 65 && c <= 90 || c >= 91 && c <= 95 || c >= 97 && c <= 122) {
      return 5;
    }

    return 0;
  }

  function s5(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 46) {
      return 6;
    }
    if (c >= 47 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 65 && c <= 90 || c >= 91 && c <= 95 || c >= 97 && c <= 122) {
      return 7;
    }

    return 0;
  }

  function s6(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 46) {
      return 6;
    }
    if (c >= 47 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 91 && c <= 95) {
      return 7;
    }
    if (c >= 65 && c <= 90 || c >= 97 && c <= 122) {
      return 8;
    }

    return 0;
  }

  function s7(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 46) {
      return 6;
    }
    if (c >= 47 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 65 && c <= 90 || c >= 91 && c <= 95 || c >= 97 && c <= 122) {
      return 7;
    }

    return 0;
  }

  function s8(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 46) {
      return 6;
    }
    if (c >= 47 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 91 && c <= 95) {
      return 7;
    }
    if (c >= 65 && c <= 90 || c >= 97 && c <= 122) {
      return 9;
    }

    return 0;
  }

  function s9(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 46) {
      return 6;
    }
    if (c >= 47 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 91 && c <= 95) {
      return 7;
    }
    if (c >= 65 && c <= 90 || c >= 97 && c <= 122) {
      return 10;
    }

    return 0;
  }

  function s10(byte c) internal pure returns (uint) {
    if (c >= 46 && c <= 46) {
      return 6;
    }
    if (c >= 47 && c <= 47 || c >= 48 && c <= 57 || c >= 58 && c <= 64 || c >= 91 && c <= 95) {
      return 7;
    }
    if (c >= 65 && c <= 90 || c >= 97 && c <= 122) {
      return 10;
    }

    return 0;
  }
}