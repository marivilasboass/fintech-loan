import { Colors } from '~/newUI'

const SOME_PENDENCY_REJECT = 'SOME_PENDENCY_REJECT'
const COMPLETE_REGISTRATION_STEPS = 'COMPLETE_REGISTRATION_STEPS'
const MONTHLY_BILLET_OPEN = 'MONTHLY_BILLET_OPEN'
const INSTALLMENT_LATE = 'INSTALLMENT_LATE'
const CHANGE_PROFILE_PICTURE = 'CHANGE_PROFILE_PICTURE'
const PROFILE_PICTURE_REJECTED = 'PROFILE_PICTURE_REJECTED'
const USER_DEFAULTED = 'USER_DEFAULTED'
const CROWDFUNDING_BANNER = 'CROWDFUNDING_BANNER'
const SLICING_ALERT_BANNER = 'SLICING_ALERT_BANNER'
const LAUNCH_SLICING_BANNER = 'LAUNCH_SLICING_BANNER'

export {
  SOME_PENDENCY_REJECT,
  COMPLETE_REGISTRATION_STEPS,
  MONTHLY_BILLET_OPEN,
  INSTALLMENT_LATE,
  CHANGE_PROFILE_PICTURE,
  PROFILE_PICTURE_REJECTED,
  USER_DEFAULTED,
  CROWDFUNDING_BANNER,
  SLICING_ALERT_BANNER,
  LAUNCH_SLICING_BANNER
}

const BannerFactory = {
  LAUNCH_SLICING_BANNER: {
    container: {
      backgroundColor: Colors.brightBlue
    },
    text: {
      color: Colors.white
    }
  },
  SLICING_ALERT_BANNER: {
    container: {
      backgroundColor: Colors.brightBlue
    },
    text: {
      color: Colors.white
    }
  },
  CROWDFUNDING_BANNER: {
    container: {
      backgroundColor: Colors.brightBlue
    },
    text: {
      color: Colors.white
    }
  },
  USER_DEFAULTED: {
    container: {
      backgroundColor: Colors.cinnabar
    },
    text: {
      color: Colors.white
    }
  },
  COMPLETE_REGISTRATION_STEPS: {
    container: {
      backgroundColor: Colors.orange
    },
    text: {
      color: Colors.white
    }
  },
  SOME_PENDENCY_REJECT: {
    container: {
      backgroundColor: Colors.orange
    },
    text: {
      color: Colors.white
    }
  },
  MONTHLY_BILLET_OPEN: {
    container: {
      backgroundColor: Colors.brightBlue
    },
    text: {
      color: Colors.white
    }
  },
  INSTALLMENT_LATE: {
    container: {
      backgroundColor: Colors.cinnabar
    },
    text: {
      color: Colors.white
    }
  },
  CHANGE_PROFILE_PICTURE: {
    container: {
      backgroundColor: Colors.brightBlue
    },
    text: {
      color: Colors.white
    }
  },
  PROFILE_PICTURE_REJECTED: {
    container: {
      backgroundColor: Colors.orange
    },
    text: {
      color: Colors.white
    }
  }
}

export default BannerFactory
