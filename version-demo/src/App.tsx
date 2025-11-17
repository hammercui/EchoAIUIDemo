import { useState } from 'react';
import { VersionTimeline } from '@/components/VersionTimeline';
import { SidePanel } from '@/components/SidePanel';
import { mockVersions, mockTags, mockPrompts } from '@/data/mockData';

function App() {
  const [tags, setTags] = useState(mockTags);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const handleTagClick = (tagId: string) => {
    setTags(
      tags.map((tag) =>
        tag.id === tagId ? { ...tag, isActive: !tag.isActive } : tag
      )
    );
  };

  const handleAddVersion = () => {
    console.log('Add new version');
    setIsSidePanelOpen(true);
  };

  const handlePromptClick = (promptId: string) => {
    console.log('Prompt clicked:', promptId);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Page Container */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16 py-10">
        <div className="relative">
          
          {/* Header Section - Always Visible */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Version Management Timeline
            </h1>
            <p className="text-sm text-slate-500">
              Drag cards to reorder • Click + to add versions • Sub-versions on left side
            </p>
          </header>

          {/* Three Panel Layout Container */}
          <div className="relative">
            {/* Flex Container for Timeline and SidePanel */}
            <div className="flex justify-center items-start gap-8 lg:gap-12 xl:gap-16">
              
              {/* Timeline Section - 居中显示,展开时左对齐 */}
              <main 
                className="transition-all duration-500 ease-out min-w-0"
                style={{
                  maxWidth: isSidePanelOpen ? 'calc(100% - 620px - 4rem)' : '900px',
                  flex: isSidePanelOpen ? '1 1 auto' : '0 0 auto',
                }}
              >
                <VersionTimeline
                  versions={mockVersions}
                  onAddVersion={handleAddVersion}
                />
              </main>

              {/* Sidebar Section - 滑入/滑出 */}
              <aside 
                className={`
                  transition-all duration-500 ease-out
                  ${isSidePanelOpen 
                    ? 'opacity-100 translate-x-0 w-[620px]' 
                    : 'opacity-0 translate-x-full w-0 pointer-events-none overflow-hidden'
                  }
                `}
                style={{
                  maxHeight: 'calc(100vh - 200px)',
                }}
              >
                <div className="sticky top-10">
                  <SidePanel
                    tags={tags}
                    prompts={mockPrompts}
                    onTagClick={handleTagClick}
                    onPromptClick={handlePromptClick}
                    onClose={handleCloseSidePanel}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
