"use client"

import { useState, useRef, type KeyboardEvent } from "react"
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
  const inputRef = useRef<HTMLInputElement>(null)

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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-purple-50 rounded-lg">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-800">発火条件</h2>
      </div>

      <div className="relative mb-4">
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 min-h-[40px] w-32">
          <span className="text-gray-700 text-sm">含む</span>
          <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
        </div>
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

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 min-w-[120px] py-1"
          />
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
