import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['InstitutionOwner'];
  const roles = ['InstitutionOwner', 'SchoolAdministrator', 'Teacher', 'StudentSupport', 'Student', 'Parent'];
  const applicationName = 'EduSphere';
  const tenantName = 'Educational Institution';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `InstitutionOwner:
1. As an InstitutionOwner, I want to be able to create and customize learning paths for different courses and programs, so that I can offer personalized education to students.
2. As an InstitutionOwner, I want to have an overview of the student progress across all courses and programs, so that I can make informed decisions about the institution's performance.
3. As an InstitutionOwner, I want to manage administrative tasks such as enrollment, billing, and scheduling, so that I can ensure smooth operations of the institution.
4. As an InstitutionOwner, I want to be able to add and manage SchoolAdministrators, Teachers, and StudentSupport staff, so that I can delegate tasks and responsibilities effectively.

SchoolAdministrator:
1. As a SchoolAdministrator, I want to be able to manage student enrollment and course registration, so that I can ensure students are placed in the appropriate courses.
2. As a SchoolAdministrator, I want to be able to manage teacher assignments and schedules, so that I can ensure classes are staffed and running smoothly.
3. As a SchoolAdministrator, I want to be able to monitor student progress and generate reports, so that I can identify areas for improvement and share updates with InstitutionOwner and Parents.

Teacher:
1. As a Teacher, I want to be able to access and customize the learning paths for my students, so that I can provide personalized instruction and support.
2. As a Teacher, I want to be able to monitor my students' progress and provide feedback, so that I can help them succeed in their courses.
3. As a Teacher, I want to be able to communicate with students and parents through the platform, so that I can address any concerns or questions they may have.

StudentSupport:
1. As a StudentSupport staff, I want to be able to access student progress data, so that I can identify students who may need additional support or intervention.
2. As a StudentSupport staff, I want to be able to communicate with students, parents, and teachers, so that I can coordinate support services and resources.
3. As a StudentSupport staff, I want to be able to track the effectiveness of support services and interventions, so that I can continuously improve our support strategies.

Student:
1. As a Student, I want to be able to access my personalized learning path, so that I can work on the courses and assignments at my own pace.
2. As a Student, I want to be able to track my progress and receive feedback from my teachers, so that I can understand my strengths and areas for improvement.
3. As a Student, I want to be able to communicate with my teachers and StudentSupport staff, so that I can ask questions and receive help when needed.

Parent:
1. As a Parent, I want to be able to monitor my child's progress in their courses, so that I can support their learning and celebrate their achievements.
2. As a Parent, I want to be able to communicate with my child's teachers and StudentSupport staff, so that I can address any concerns or questions I may have.
3. As a Parent, I want to be able to access resources and information about the educational institution, so that I can stay informed and engaged in my child's education.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
