import './ThemeSwitcher.scss'

const ThemeSwitcher = ({ onClick, value }: { onClick: (status: boolean) => void; value: boolean }) => {
  return (
    <div className='theme-switcher'>
      <input id="checkbox_toggle" checked={value} type="checkbox" className="check" onClick={(e: any) => onClick(e.target.checked)} />
      <div className="checkbox">
        <label className="slide" htmlFor="checkbox_toggle">
          <label className="toggle" htmlFor="checkbox_toggle"></label>
          <label className="text" htmlFor="checkbox_toggle">
            Day
          </label>
          <label className="text" htmlFor="checkbox_toggle">
            Night
          </label>
        </label>
      </div>
    </div>
  )
}

export default ThemeSwitcher
