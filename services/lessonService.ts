import { supabase } from '../utils/supabaseClient';
import { LessonBlock, TextBlock, OpenQuestionBlock, MultipleChoiceBlock } from '@lessonTypes/lesson';

// Function to store a lesson block in Supabase
export const storeBlockInSupabase = async (block: LessonBlock) => {
  // Define a variable to hold the block's data
  let blockData: any = {
    id: block.id,
    type: block.type,
    lesson_phase: block.lesson_phase // Include lesson_phase
  };

  // Narrow the type and add the corresponding properties
  switch (block.type) {
    case 'TextBlock':
      blockData.content = (block as TextBlock).content;
      break;
    case 'OpenQuestionBlock':
      blockData.question = (block as OpenQuestionBlock).question;
      blockData.answer = (block as OpenQuestionBlock).answer;
      break;
    case 'MultipleChoiceBlock':
      blockData.question = (block as MultipleChoiceBlock).question;
      blockData.options = (block as MultipleChoiceBlock).options;
      blockData.correctAnswers = (block as MultipleChoiceBlock).correctAnswers;
      break;
    default:
      throw new Error('Unknown block type');
  }

  // Insert the block data into Supabase
  const { data, error } = await supabase
    .from('lesson_blocks')  // Insert into lesson_blocks table
    .insert([blockData]);

  if (error) {
    console.error('Error inserting block:', error.message);
  } else {
    console.log('Block inserted successfully:', data);
  }

  return { data, error };
};

// Function to fetch all lesson blocks from Supabase
export const fetchBlocksFromSupabase = async () => {
  const { data, error } = await supabase
    .from('lesson_blocks')
    .select('*'); // Fetch all fields

  if (error) {
    console.error('Error fetching blocks:', error.message);
  } else {
    console.log('Blocks fetched successfully:', data);
  }

  return { data, error };
};
