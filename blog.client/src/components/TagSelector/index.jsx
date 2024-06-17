import {useEffect, useRef, useState} from "react";
import useGet from "@/hooks/useGet.js";
import {BACKEND_URL} from "@/config.js";
import ListItemButton from "@/components/List/ListItemButton/index.jsx";
import PropTypes from "prop-types";
import s from './index.module.scss'

function TagSelector({ selectedTags, setSelectedTags}){
  const [tagContainer, setTagContainer] = useState([]); // 所有的 tags
  // const [selectedTags, setSelectedTags] = useState([]); // 存放选中的 tags
  const [showTagList, setShowTagList] = useState(false); // 控制 tag 列表的显示
  const { getData } = useGet()
  const tagListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const tags = await getData(`${BACKEND_URL}/api/tags`)
      setTagContainer(tags.data)
    }
    fetchData()
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagListRef.current && !tagListRef.current.contains(event.target)) {
        setShowTagList(false); // 点击标签列表外部，隐藏标签列表
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleInputClick = () => {
    setShowTagList(!showTagList); // 切换 tag 列表的显示状态
  };

  const isSelected = (tag) => {
    return selectedTags.some(selectedTag => selectedTag._id === tag._id);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.some(selectedTag => selectedTag._id === tag._id)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag._id !== tag._id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className={s.tagSelector}>
      <div className={s.inputContainer}>
        <input
          type="text"
          onClick={handleInputClick}
          value={selectedTags.map(tag => tag.name).join(', ')}
          readOnly
        />
      </div>

        {showTagList && (
          <div  ref={tagListRef} className={s.tagList}>
            <div className={s.listItem}>
              {tagContainer?.map((tag) => (
                <div key={tag._id} >
                  <ListItemButton onClick={() => handleTagClick(tag)} isSelected={isSelected(tag)}>
                    {tag.name}
                  </ListItemButton>
                </div>
              ))}
            </div>
          </div>
        )}

    </div>
  );
}

TagSelector.propTypes = {
  tagContainer: PropTypes.array,
  setTagContainer: PropTypes.func,
  selectedTags: PropTypes.array,
  setSelectedTags: PropTypes.func
}

export default TagSelector