import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
        </ul>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
        </h1>
        {
          context.router.isActive('/', true)
        }
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
};

export default Header;
