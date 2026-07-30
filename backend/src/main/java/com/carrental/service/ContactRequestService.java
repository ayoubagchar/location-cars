package com.carrental.service;

import com.carrental.dto.ContactRequestDto;
import com.carrental.entity.ContactRequest;
import com.carrental.repository.ContactRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactRequestService {

    @Autowired
    private ContactRequestRepository contactRequestRepository;

    @Transactional
    public ContactRequestDto createContactRequest(ContactRequestDto dto) {
        ContactRequest request = ContactRequest.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .message(dto.getMessage())
                .isRead(false)
                .build();

        ContactRequest saved = contactRequestRepository.save(request);
        return convertToDto(saved);
    }

    public Page<ContactRequestDto> getAllContactRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactRequest> requests = contactRequestRepository.findAllByOrderByCreatedAtDesc(pageable);
        return requests.map(this::convertToDto);
    }

    @Transactional
    public ContactRequestDto markAsRead(Long id) {
        ContactRequest request = contactRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact request not found with id: " + id));

        request.setIsRead(true);
        ContactRequest saved = contactRequestRepository.save(request);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteContactRequest(Long id) {
        if (!contactRequestRepository.existsById(id)) {
            throw new RuntimeException("Contact request not found with id: " + id);
        }
        contactRequestRepository.deleteById(id);
    }

    private ContactRequestDto convertToDto(ContactRequest request) {
        return ContactRequestDto.builder()
                .id(request.getId())
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .message(request.getMessage())
                .isRead(request.getIsRead())
                .createdAt(request.getCreatedAt())
                .build();
    }
}
