"use client"

import { useState, useRef, type KeyboardEvent, type MouseEvent } from "react"
import { X, ChevronDown } from "lucide-react"

interface TagInputProps {
  placeholder?: string
  initialTags?: string[]
  onTagsChange?: (tags: string[]) => void
  maxTags?: number
}

export function TagInput({
  placeholder = "Enter tags...",
  initialTags = [],
  onTagsChange,
  maxTags = 10,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState("")
  const [selectedOption, setSelectedOption] = useState("含む")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const dropdownOptions = ["含む", "Equalto", "Any"]

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      const newTags = [...tags, trimmedTag]
      setTags(newTags)
      onTagsChange?.(newTags)
      setInputValue("")
    }
  }

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove)
    setTags(newTags)
    onTagsChange?.(newTags)
    // Focus back to input after removing tag
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false)
    }
  }

  useState(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-purple-50 rounded-lg">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-800">発火条件</h2>
      </div>

      <div className="relative mb-4" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 min-h-[40px] w-32 hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-700 text-sm">{selectedOption}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {dropdownOptions.map((option) => (
              <button
                key={option}
                onClick={() => selectOption(option)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedOption === option ? "bg-blue-50 text-blue-700" : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="bg-white border border-gray-300 rounded-md p-3 min-h-[80px] cursor-text"
        onClick={handleContainerClick}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm"
            >
              <span className="mr-2">{tag}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(index)
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <select
            className="bg-transparent border-none outline-none text-gray-700 text-sm cursor-pointer"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Helper text */}
      {tags.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {tags.length}/{maxTags} tags added
        </p>
      )}
    </div>
  )
}
