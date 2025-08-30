import { TagInput } from "@/components/tag-input"

export default function Home() {
  const handleTagsChange = (tags: string[]) => {
    console.log("Tags updated:", tags)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Tag Input Component</h1>

        <div className="space-y-8">
          <TagInput
            placeholder="Type and press Enter to add tags..."
            initialTags={["ゴールド", "プラチナ", "ダイヤ", "ブラック", "ホワイト", "VIP", "お得意様", "Royal"]}
            onTagsChange={handleTagsChange}
            maxTags={12}
          />

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-800">Features:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Tags are displayed inside the expandable input area</li>
              <li>• Add tags by typing and pressing Enter or comma</li>
              <li>• Remove tags by clicking the X button</li>
              <li>• Backspace to remove the last tag when input is empty</li>
              <li>• Click anywhere in the input area to focus</li>
              <li>• Prevents duplicate tags and has configurable limits</li>
              <li>• Matches the original design with purple background</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
