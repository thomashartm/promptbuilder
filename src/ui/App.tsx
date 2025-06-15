import React, { useState } from 'react';
import FrameworkForm from './FrameworkForm';
import SavedPrompts from './SavedPrompts';

export default function App() {
  const [tab, setTab] = useState<'builder' | 'saved'>('builder');

  return (
    <div className="p-2 text-sm font-sans w-[400px]">
      <div className="flex mb-2 space-x-2">
        <button className={tab === 'builder' ? 'font-bold' : ''} onClick={() => setTab('builder')}>Builder</button>
        <button className={tab === 'saved' ? 'font-bold' : ''} onClick={() => setTab('saved')}>Saved</button>
      </div>
      {tab === 'builder' ? <FrameworkForm /> : <SavedPrompts />}
    </div>
  );
}
