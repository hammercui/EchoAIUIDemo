import React, { useState } from 'react';
import { VersionTimeline } from '@/components/VersionTimeline';
import { SidePanel } from '@/components/SidePanel';
import { mockVersions, mockTags, mockPrompts } from '@/data/mockData';

function App() {
  const [tags, setTags] = useState(mockTags);

  const handleTagClick = (tagId: string) => {
    setTags(
      tags.map((tag) =>
        tag.id === tagId ? { ...tag, isActive: !tag.isActive } : tag
      )
    );
  };

  const handleAddVersion = () => {
    console.log('Add new version');
  };

  const handlePromptClick = (promptId: string) => {
    console.log('Prompt clicked:', promptId);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* 时间线区域 */}
          <div>
            <VersionTimeline
              versions={mockVersions}
              onAddVersion={handleAddVersion}
            />
          </div>

          {/* 侧边面板 */}
          <div className="lg:sticky lg:top-8">
            <SidePanel
              tags={tags}
              prompts={mockPrompts}
              onTagClick={handleTagClick}
              onPromptClick={handlePromptClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
