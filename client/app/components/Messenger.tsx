import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import "@/css/Messenger.css"

const Messenger = () => {
  return (
    <>
      <div className="messenger-float">
        <Link 
          href='https://m.me/659299587268782' 
          target='_blank'
          className="btn"
          aria-label="Chat with us on Messenger"
        >
          <Image src='/messenger1.png' alt='' width={60} height={60} />
        </Link>
      </div>
    </>
  );
};

export default Messenger;