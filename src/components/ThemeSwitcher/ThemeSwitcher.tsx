import './ThemeSwitcher.scss'

const ThemeSwitcher = ({ onClick, value }: { onClick: (status: boolean) => void; value: boolean }) => {
  return (
    <div className="theme-switcher">
      <label className="ui-switch">
        <input type="checkbox" checked={value} onChange={(e) => onClick(e.target.checked)} />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  )
}

export default ThemeSwitcher
