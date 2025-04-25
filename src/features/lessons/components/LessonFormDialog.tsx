'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LessonStatus } from '@/drizzle/schema';
import { ReactNode, useState } from 'react';
import LessonForm from './LessonForm';

type SectionFormDialogProps = {
  sections: { id: string; name: string }[];
  defaultSectionId?: string;
  lesson?: {
    id: string;
    name: string;
    status: LessonStatus;
    youtubeVideoId: string;
    description: string | null;
    sectionId: string;
  };
  children: ReactNode;
};

function LessonFormDialog({ children, sections, defaultSectionId, lesson }: SectionFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lesson == null ? 'New Lesson' : `Edit ${lesson.name}`}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <LessonForm
            sections={sections}
            lesson={lesson}
            defaultSectionId={defaultSectionId}
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default LessonFormDialog;
