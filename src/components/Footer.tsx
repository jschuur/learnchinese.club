export default function Footer() {
  return (
    <footer className='py-6 text-sm font-light text-center'>
      <div>
        Powered <a href='https://joostschuur.com'>Joost Schuur</a> and ChatGPT &middot;{' '}
        <a href='https://twitter.com/joostschuur'>@joostschuur</a> &middot;{' '}
        <a href='https://github.com/jschuur/learnchinese.club'>GitHub</a>
      </div>
      <div>
        Work in progress: HSK level generation needs improving, add filter by HSK level, add click
        to reveal interface.
      </div>
    </footer>
  );
}
