# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# React to user input
if prompt := st.chat_input("Ask something about your PDF"):
    # Display user message in chat message container
    st.chat_message("user").markdown(prompt)
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

    # Get response from AI
    with st.spinner("Thinking..."):
        response = qa_chain.invoke(prompt)
        full_response = response["result"]

    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        st.markdown(full_response)
    
    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": full_response})