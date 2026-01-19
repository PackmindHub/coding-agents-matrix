import ReactMarkdown from 'react-markdown'
import Drawer from './Drawer'
import changelogContent from '../../changelog.md?raw'

const ChangelogDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Changelog">
      <div className="changelog-content">
        <ReactMarkdown>{changelogContent}</ReactMarkdown>
      </div>
    </Drawer>
  )
}

export default ChangelogDrawer
